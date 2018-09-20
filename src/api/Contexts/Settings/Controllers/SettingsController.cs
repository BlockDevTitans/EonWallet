using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Text;

namespace api.Contexts.Settings.Controllers
{
	class SettingsController : INotifyPropertyChanged
	{
		#region INotifyPropertyChanged

		public event PropertyChangedEventHandler PropertyChanged;

		void OnPropertyChanged([CallerMemberName] string propertyname = null)
		{
			PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyname));
		}

		#endregion


		public SettingsController(SettingsContext ctx)
		{
			_context = ctx;
			//the events can be caught in js side by registering once like this: this.electronService.registerForEvents("settings", (args) => { ...do something with args });
			// args is a serialized version of this class, so it will have fileds like this: args.Version, args.Network, args.Language etc...
			_context.PropertyChanged += (s, e) => OnPropertyChanged(e.PropertyName);
		}

		readonly SettingsContext _context;

		//it's called from js side like this: this.electronService.sendCommand("settings.GetState", null, (returnValue) => { ...do something with returnValue });
		// returnValue is a serialized version of this class, so it will have fileds like this: args.Version, args.Network, args.Language etc...
		public object GetState() => this;

		public void SetLanguage(string lang)
		{
			//it's called from js side like this: this.electronService.sendCommand("settings.SetLanguage", [ 'en' ], null);
			//As soon as the property is changed an event is also sent up the chain into js side
			_context.Language = lang;
		}

		//it's called from js side like this: this.electronService.sendCommand("settings.SetNetwork", [ 'main|testnet' ], null);
		//As soon as the property is changed it triggers a reinitilaization of eonclient in walletContext instance
		public void SetNetwork(string address)
		{
			switch (address)
			{
				case "main":
					_context.NetworkAddress = EonSharp.Constants.NETWORK_MAIN;
					break;
				case "testnet":
					_context.NetworkAddress = EonSharp.Constants.NETWORK_TESTNET;
					break;
				default:
					_context.NetworkAddress = address;
					break;
			}
		}

		//it's called from js side like this: this.electronService.sendCommand("settings.Save", null, null);
		public void Save() => _context.Save();


		//the following are properties that are serialized to js side from a GetState call

		public string Version => _context.Version.ToString();

		public string Network => _context.NetworkAddress;

		public string Language => _context.Language;




	}
}
