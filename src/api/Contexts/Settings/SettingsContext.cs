using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;

namespace api.Contexts.Settings
{
	class SettingsContext : INotifyPropertyChanged
	{
		#region INotifyPropertyChanged

		public event PropertyChangedEventHandler PropertyChanged;

		void OnPropertyChanged([CallerMemberName] string propertyname = null)
		{
			PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyname));
		}

		#endregion

		public SettingsContext()
		{
			var args = Environment.GetCommandLineArgs();
			var idx = Array.IndexOf(args, "-datadir");
			DataDir = idx > -1 && args.Length > idx + 1 ? args[idx + 1] : AppContext.BaseDirectory;

			Load();
		}

		const string USER_SETTINGS_FILE = "wallet.dat";

		[Newtonsoft.Json.JsonIgnore]
		public string DataDir { get; private set; }

		void Load()
		{
			var path = System.IO.Path.Combine(DataDir, USER_SETTINGS_FILE);
			while (!System.IO.Directory.Exists(DataDir))
			{
				System.IO.Directory.CreateDirectory(DataDir);
			}
			if (System.IO.File.Exists(path))
			{
				Newtonsoft.Json.JsonConvert.PopulateObject(System.IO.File.ReadAllText(path), this);
			}
			else
			{
				Save();
			}
		}

		public void Save()
		{
			var path = System.IO.Path.Combine(DataDir, USER_SETTINGS_FILE);
			System.IO.File.WriteAllText(path, Newtonsoft.Json.JsonConvert.SerializeObject(this));
		}


		public string Version
		{
			get => _version;
			set
			{
				_version = value;
				OnPropertyChanged();
			}
		}
		string _version = "1.0.0.0";

		public string NetworkAddress
		{
			get => _networkAddress;
			set
			{
				_networkAddress = value;
				OnPropertyChanged();
			}
		}
		string _networkAddress = EonSharp.Constants.NETWORK_TESTNET;

		public string Language
		{
			get => _language;
			set
			{
				_language = value;
				OnPropertyChanged();
			}
		}
		string _language = "en";

		public string Wallets { get; set; }

	}
}
