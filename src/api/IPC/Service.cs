using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.IO.Pipes;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace api.IPC
{
	class Service
	{
		public BlockingCollection<Message> OutQueue { get; private set; } = new BlockingCollection<Message>(100);
		public BlockingCollection<Message> InQueue { get; private set; } = new BlockingCollection<Message>(100);

		public event EventHandler ClientConnected;


		public void Start()
		{
			var ts = Task.Run(() => ServerThread());
		}
		public void Stop()
		{
		}


		void ServerThread()
		{
			string pipename;
			if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
			{
				pipename = "tmp-app.eoncore";
			}
			else
			{
				pipename = "/tmp/app.eoncore";
			}

			while (true)
			{
				using (var pipe = new NamedPipeServerStream(pipename, PipeDirection.InOut, 1, PipeTransmissionMode.Byte, PipeOptions.Asynchronous | PipeOptions.WriteThrough))
				{
					pipe.WaitForConnection();
#if DEBUG
					Console.WriteLine("Client connected.");
#endif
					var wctks = new CancellationTokenSource();
					var wtoken = wctks.Token;
					try
					{
						Task.Run(() =>
						{
							while (!wtoken.IsCancellationRequested)
							{
								try
								{
									var obj = OutQueue.Take(wtoken);
									if (obj == null)
									{
										break;
									}
									var wmsg = JsonConvert.SerializeObject(obj);
									pipe.Write(Encoding.UTF8.GetBytes(wmsg + "\f"));
#if DEBUG
									Console.WriteLine("[SENT] " + wmsg);
#endif
								}
								catch (JsonException json)
								{
#if DEBUG
									Console.WriteLine("ERROR: {0}", json.Message);
#endif
								}
								catch (Exception e) when (e is IOException || e is OperationCanceledException)
								{
									break;
								}
								catch (Exception e)
								{
#if DEBUG
									Console.WriteLine("ERROR: {0}", e.Message);
#endif
									break;
								}
							}
						}, wtoken);

						ClientConnected?.Invoke(null, EventArgs.Empty);

						var inBuffer = new byte[1024].AsSpan();
						while (true)
						{
							var read = pipe.Read(inBuffer);
							if (read < 1)
							{
								break;
							}
							var msg = Encoding.UTF8.GetString(inBuffer.Slice(0, read));
#if DEBUG
							Console.WriteLine("[RECEIVED] " + msg);
#endif
							try
							{
								InQueue.Add(JsonConvert.DeserializeObject<Message>(msg));
							}
							catch (JsonException json)
							{
#if DEBUG
								Console.WriteLine("[ERROR] " + json);
#endif
							}
						}
					}
					catch (IOException)
					{
					}
					catch (Exception e)
					{
						Console.WriteLine("ERROR: {0}", e.Message);
					}
					finally
					{
						wctks.Cancel();
					}
#if DEBUG
					Console.WriteLine("Client disconnected.");
#endif
				}
			}
		}
	}

}

