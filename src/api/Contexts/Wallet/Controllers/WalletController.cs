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

			//the events can be caught in js side by registering once like this: this.electronService.registerForEvents("wallet", (args) => { ...do something with args });
			// args contains a serialized version of the wallets collection like this: args.Wallets
			_context.WalletsCollection.CollectionChanged += (s, e) =>
			{
				switch (e.Action)
				{
					case System.Collections.Specialized.NotifyCollectionChangedAction.Add:
						foreach (EonSharp.Wallet wallet in e.NewItems)
						{
							wallet.PropertyChanged += (ps, p) =>
							{
								OnPropertyChanged("Wallets");
							};
						}
						break;
				}
				OnPropertyChanged("Wallets");
			};
		}

		readonly WalletContext _context;

		public object GetState()
		{
			//it's called from js side like this: this.electronService.sendCommand("wallet.GetState", null, (returnValue) => { ...do something with returnValue });
			// returnValue is a serialized version of this class, so it will have fileds like this: args.Wallets etc...
			return this;
		}

		public IEnumerable<EonSharp.Wallet> Wallets => _context.WalletsCollection;

        public bool IsNewSetup() {
           return _context.WalletsCollection.Count == 0;
        } // this._context.WalletsCollection.Count == 0;

		//it's called from js side like this: this.electronService.sendCommand("wallet.AddWallet", [ 'the name', 'the passwd' ], (returnValue) => { ...do something with returnValue });
		// returnValue is a serialized version of the newly created wallet
		public async Task<EonSharp.Wallet> AddWallet(string name, string password) => await _context.AddWallet(name, password);


		//it's called from js side like this: this.electronService.sendCommand("wallet.AddWallet", [ 'the name', 'the seed', 'the passwd' ], (returnValue) => { ...do something with returnValue });
		// returnValue is a serialized version of the newly derived from seed wallet
		public async Task<EonSharp.Wallet> AddWallet(string name, string seed, string password) => await _context.AddWallet(name, seed, password);

		//it's called from js side like this: this.electronService.sendCommand("wallet.GetNetworkDetails", null, (returnValue) => { ...do something with returnValue });
		// returnValue is a serialized version of the Attributes class containing information like the fork etc..
		public async Task<EonSharp.Api.Attributes> GetNetworkDetails() => await _context.GetNetworkDetails();

		//it's called from js side like this: this.electronService.sendCommand("wallet.GetAccountInformation", [ 'account id' ], (returnValue) => { ...do something with returnValue });
		// returnValue is a serialized version of the Info class containing information like the balance, deposit, account type etc..
		public async Task<EonSharp.Api.Info> GetAccountInformation(string accountid) => await _context.GetAccountInformation(accountid);

		//it's called from js side like this: this.electronService.sendCommand("wallet.GetPrivateAccountDetails", [ 'account id', 'wallet password' ], (returnValue) => { ...do something with returnValue });
		// returnValue is a serialized version of a dynamic object containing the following information WalletName, AccountId, AccountNumber, PrivateKey, PublicKey
		public async Task<object> GetPrivateAccountDetails(string accountid, string password) => await _context.GetPrivateAccountDetails(accountid, password);
	}
}