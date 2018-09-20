using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EonSharp;
using EonSharp.Api;
using EonSharp.Api.Transactions.ExtensionMethods;

namespace api.Contexts.Wallet
{
	class WalletContext
	{
		public WalletContext(Settings.SettingsContext ctx)
		{
			this._settings = ctx;

			InitializeEonClient();
			InitializeWallets();

			//if network is changed in settings automatically update the eonClient
			this._settings.PropertyChanged += (s, e) =>
			{
				switch (e.PropertyName)
				{
					case "NetworkAddress":
						InitializeEonClient();
						break;
					default:
						break;
				}
			};
		}

		readonly Settings.SettingsContext _settings;


		void InitializeEonClient()
		{
			Configuration.IgnoreSslErrors = true;
			this._eonclient = new EonClient(_settings.NetworkAddress);
			var t = Task.Run(async () =>
			{
				await _eonclient.UpdateBlockchainDetails();
			});
		}
		EonClient _eonclient;

		void InitializeWallets()
		{
			if (!string.IsNullOrWhiteSpace(_settings.Wallets))
			{
				foreach (var wl in _settings.Wallets.FromJsonToWallets())
				{
					WalletsCollection.Add(wl);
				}
			}
		}
		public ObservableCollection<EonSharp.Wallet> WalletsCollection { get; private set; } = new ObservableCollection<EonSharp.Wallet>();

		public void SaveWallets()
		{
			_settings.Wallets = WalletsCollection.ToJson();
			_settings.Save();
		}

		public async Task<EonSharp.Wallet> AddWallet(string name, string password)
		{
			var wallet = await Task.Run(() => new EonSharp.Wallet(name, password));
			WalletsCollection.Add(wallet);
			SaveWallets();
			return wallet;
		}

		public async Task<EonSharp.Wallet> AddWallet(string name, string seed, string password)
		{
			var wallet = await Task.Run(() => new EonSharp.Wallet(name, EonSharp.Helpers.HexHelper.HexStringToByteArray(seed), password));
			WalletsCollection.Add(wallet);
			SaveWallets();
			return wallet;
		}

		public async Task<Attributes> GetNetworkDetails() => await this._eonclient.Peer.Metadata.GetAttributesAsync();

		public async Task<Info> GetAccountInformation(string accountid)
		{
			var wallet = this.WalletsCollection.FirstOrDefault(w => w.AccountDetails.AccountId.Equals(accountid, StringComparison.OrdinalIgnoreCase));
			await wallet.RefreshAsync(this._eonclient);
			return wallet.Information;
			
		}
	}
}
