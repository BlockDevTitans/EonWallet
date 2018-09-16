using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace api.Contexts.Wallet.Controllers
{
	class WalletController : INotifyPropertyChanged
	{
		#region INotifyPropertyChanged

		public event PropertyChangedEventHandler PropertyChanged;

		void OnPropertyChanged([CallerMemberName] string propertyname = null)
		{
			PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyname));
		}

		#endregion


		public WalletController(WalletContext ctx)
		{
			_context = ctx;

			_context.WalletsCollection.CollectionChanged += (s, e) => OnPropertyChanged("Wallets");
		}

		readonly WalletContext _context;

		public object GetState()
		{
			return this;
		}

		public IEnumerable<EonSharp.Wallet> Wallets => _context.WalletsCollection;

		public async Task<EonSharp.Wallet> AddWallet(string name, string password) => await _context.AddWallet(name, password);

	}
}