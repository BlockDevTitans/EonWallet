using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel;
using System.Dynamic;
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
					object[] data = null;
					if (msg.data is Newtonsoft.Json.Linq.JArray array)
					{
						data = array.ToObject<object[]>();
					}
                   var property =  cls.GetType().GetProperty(kv[1]);
                    if(property == null) { 

					var mi = cls.GetType().GetMethod(kv[1], data == null ? new Type[0] : data.Select(o => o.GetType()).ToArray());
                        if (mi.ReturnType.GetMethod("GetAwaiter") != null)
                        {
                            var ts = Task.Run(async () => await (dynamic)mi.Invoke(cls, data)).ContinueWith(t =>
                            {
                                service.OutQueue.Add(new Message { type = msg.type, data = t.Result });
                            });
                        }
                        else
                        {
                            service.OutQueue.Add(new Message { type = msg.type, data = mi.Invoke(cls, data) });
                        }
                    } else
                    {
                        service.OutQueue.Add(new Message { type = msg.type, data = property.GetValue(cls) });
                    }

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
			dynamic obj = new ExpandoObject();
			obj.name = sender.GetType().Name.Replace("Controller", "").ToLower();
			obj.data = sender;
			service.OutQueue.Add(new Message { type = "event", data = obj });
		}


		public void SendMessage(Message msg)
		{
			service?.OutQueue.Add(msg);
		}

	}
}
