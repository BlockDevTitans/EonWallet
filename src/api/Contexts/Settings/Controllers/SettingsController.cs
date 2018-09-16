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
			_context.PropertyChanged += (s, e) => OnPropertyChanged(e.PropertyName);
		}

		readonly SettingsContext _context;

		public object GetState()
		{
			return this;
		}

		public string Version => _context.Version.ToString();

		public string Network => _context.NetworkAddress;


	}
}
