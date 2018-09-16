using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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
			_settings = ctx;

			InitializeEonClient();
			InitializeWallets();
		}

		readonly Settings.SettingsContext _settings;


		void InitializeEonClient()
		{
			Configuration.IgnoreSslErrors = true;
			_eonclient = new EonClient(_settings.NetworkAddress);
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
			return wallet;
		}
	}
}
