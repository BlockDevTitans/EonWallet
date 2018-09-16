using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace api
{
	class Program
	{
		public static void Main(string[] args)
		{

			var root_context = new Contexts.RootContext();

			var server = new IPC.Server();
			server.RegisterClass(root_context.Controllers);
			var t = Task.Run(() => server.Run());

			Console.WriteLine("Started ipc server");

			Console.TreatControlCAsInput = true;
			for (; ; )
			{
				var k = Console.ReadKey();
				if (k.Modifiers == ConsoleModifiers.Control && k.Key == ConsoleKey.C)
				{
					break;
				}
			}
		}
	}
}