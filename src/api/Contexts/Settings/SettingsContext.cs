using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Text;

namespace api.Contexts.Settings
{
	[SettingsGroupName("EonWallet")]
	class SettingsContext : ApplicationSettingsBase
	{
		public SettingsContext()
		{
		}


		[UserScopedSetting(), DefaultSettingValue("1.0.0.0")]
		public string Version { get => this["Version"] as string; set => this["Version"] = value; }

		[UserScopedSetting(), DefaultSettingValue(EonSharp.Constants.NETWORK_TESTNET)]
		public string NetworkAddress { get => this["NetworkAddress"] as string; set => this["NetworkAddress"] = value; }

		[UserScopedSetting(), DefaultSettingValue("en")]
		public string Language { get => this["Language"] as string; set => this["Language"] = value; }

		[UserScopedSetting()]
		public string Wallets { get => this["Wallets"] as string; set => this["Wallets"] = value; }



	}
}
