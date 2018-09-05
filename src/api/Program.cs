using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;

namespace api
{
	class Program
	{
		public static void Main(string[] args)
		{
			var server = new IPC.Server();
			server.RegisterClass(new Controllers.WalletController());
			var t = Task.Run(() => server.Run());

			Console.WriteLine("Started ipc server");

			var mr = new ManualResetEventSlim(false);
			Console.CancelKeyPress += (s, e) => mr.Set();
			mr.Wait();
		}




	}





}