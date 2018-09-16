using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace api.Contexts
{
	class RootContext
	{
		public RootContext()
		{
			InitializeContexts();
			InitializeControllers();
		}


		void InitializeContexts()
		{
			var myTypes = GetType().Assembly.DefinedTypes;
			bool ctxquery(TypeInfo t) => t.Namespace == null ? false : !t.Namespace.StartsWith("System") && t.Name != GetType().Name && t.Name.EndsWith("Context");
			var ctxtypes = myTypes.Where(ctxquery).OrderBy(t => t.GetConstructors().Sum(c => c.GetParameters().Count()));
			foreach (var t in ctxtypes)
			{
				var parameters = new List<object>();
				var ctorsprms = t.GetConstructors().Where(c => c.GetParameters().Count() > 0).Select(c => c.GetParameters()).FirstOrDefault();
				if (ctorsprms != null)
				{
					foreach (var ptype in ctorsprms)
					{
						if (_contexts.TryGetValue(ptype.ParameterType, out object instance))
						{
							parameters.Add(instance);
						}
					}
				}
				_contexts.Add(t, Activator.CreateInstance(t, parameters.ToArray()));
			}
		}

		readonly Dictionary<Type, object> _contexts = new Dictionary<Type, object>();

		void InitializeControllers()
		{
			var myTypes = GetType().Assembly.DefinedTypes;
			bool ctlquery(TypeInfo t) => t.Namespace == null ? false : !t.Namespace.StartsWith("System") && t.Name.EndsWith("Controller");
			var ctltypes = myTypes.Where(ctlquery).OrderBy(t => t.GetConstructors().Sum(c => c.GetParameters().Count()));
			foreach (var t in ctltypes)
			{
				var parameters = new List<object>();
				var ctorsprms = t.GetConstructors().Where(c => c.GetParameters().Count() > 0).Select(c => c.GetParameters()).FirstOrDefault();
				if (ctorsprms != null)
				{
					foreach (var ptype in ctorsprms)
					{
						if (_contexts.TryGetValue(ptype.ParameterType, out object ctxinstance))
						{
							parameters.Add(ctxinstance);
						}
						else if (_controllers.TryGetValue(ptype.ParameterType, out object ctlinstance))
						{
							parameters.Add(ctlinstance);
						}
					}
				}
				_controllers.Add(t, Activator.CreateInstance(t, parameters.ToArray()));
			}
		}

		readonly Dictionary<Type, object> _controllers = new Dictionary<Type, object>();

		public IEnumerable<object> Controllers => _controllers.Values;


	}
}
