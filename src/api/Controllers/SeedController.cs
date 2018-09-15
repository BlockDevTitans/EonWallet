using EonSharp.Generators;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace api.Controllers
{
    public class SeedController
    {
        public async Task<string> Generate()
        {
            return SeedGenerator.NewSeedAsString();
        }
    }
}
