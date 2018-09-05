using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace api.Controllers
{
    public class WalletController 
    {

		public async Task<IEnumerable<string>> ListNodes(string addr1, long addr2)
		{
			EonSharp.Configuration.IgnoreSslErrors = true;
			var eonclient = new EonSharp.EonClient();
			await eonclient.UpdateBlockchainDetails();
			var attribs = await eonclient.Peer.Metadata.GetAttributesAsync();

			var l = new List<string>(await eonclient.Peer.Metadata.GetWellKnownNodesAsync());
			l.Add(addr1);
			l.Add(addr2.ToString());
			return l;
		}


	}
}