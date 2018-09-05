using System;
using System.Collections.Generic;
using System.Text;

namespace api.IPC
{
	class Message
	{
		public Message()
		{

		}
		public string type { get; set; }
		public object data { get; set; }
	}
}
