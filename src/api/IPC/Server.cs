using System;
using System.Collections.Generic;
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
					service.OutQueue.Add(new Message { type = msg.type, data = Task.Run(async () => await (dynamic)mi.Invoke(cls, data)).Result });
				}
			}

		}


		public void RegisterClass(object instance)
		{
			classMap.Add(instance.GetType().Name.ToLower(), instance);
		}
		public void RegisterClass(IEnumerable<object> instances)
		{
			foreach (var instance in instances)
			{
				classMap.Add(instance.GetType().Name.ToLower(), instance);
			}
		}
		public void RegisterClass(Type type)
		{

		}




		public void SendMessage(Message msg)
		{
			service?.OutQueue.Add(msg);
		}

	}
}
