using api.Models;
using EonSharp.Generators;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace api.Controllers
{
    public class SeedController
    {
        public async Task<Account> Generate()
        {
            var seed = SeedGenerator.NewSeed();
            var account = new AccountGenerator(seed);
            return new Account
            {
                Seed = account.PrivateKeyToString(),
                PublicAddress = account.AccountId
            };
        }
    }
}
