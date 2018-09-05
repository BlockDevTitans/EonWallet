using System;
using System.Collections.Generic;

namespace api.IPC
{
	interface IServer
	{
		void RegisterClass(IEnumerable<object> instances);
		void RegisterClass(object instance);
		void RegisterClass(Type type);
		void Run();
		void SendMessage(Message msg);
	}
}