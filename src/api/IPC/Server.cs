using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using System.Threading.Tasks;

namespace api.IPC
{
	class Server : IServer
	{
		readonly Dictionary<string, object> classMap = new Dictionary<string, object>();
		Service service;

		public void Run()
		{
			service = new Service();
			service.Start();
			while (true)
			{
				var msg = service.InQueue.Take();

				var kv = msg.type.Split('.');
				if (classMap.TryGetValue(kv[0] + "controller", out object cls))
				{
					var mi = cls.GetType().GetMethod(kv[1]);
					object[] data = null;
					if (msg.data is Newtonsoft.Json.Linq.JArray array)
					{
						data = array.ToObject<object[]>();
					}
					else
					{
						data = new object[] { msg.data };
					}

					var ts = Task.Run(async () => await (dynamic)mi.Invoke(cls, data)).ContinueWith(t =>
					{
						service.OutQueue.Add(new Message { type = msg.type, data = t.Result });
					});

					//service.OutQueue.Add(new Message { type = msg.type, data = Task.Run(async () => await (dynamic)mi.Invoke(cls, data)).Result });
				}
			}

		}


		public void RegisterClass(object instance)
		{
			if (instance is INotifyPropertyChanged npc)
			{
				npc.PropertyChanged += Npc_PropertyChanged;
			}
			classMap.Add(instance.GetType().Name.ToLower(), instance);
		}
		public void RegisterClass(IEnumerable<object> instances)
		{
			foreach (var instance in instances)
			{
				if (instance is INotifyPropertyChanged npc)
				{
					npc.PropertyChanged += Npc_PropertyChanged;
				}
				classMap.Add(instance.GetType().Name.ToLower(), instance);
			}
		}
		public void RegisterClass(Type type)
		{

		}

		private void Npc_PropertyChanged(object sender, PropertyChangedEventArgs e)
		{
			service.OutQueue.Add(new Message { type = sender.GetType().Name.Replace("Controller", "-event").ToLower(), data = sender });
		}


		public void SendMessage(Message msg)
		{
			service?.OutQueue.Add(msg);
		}

	}
}
