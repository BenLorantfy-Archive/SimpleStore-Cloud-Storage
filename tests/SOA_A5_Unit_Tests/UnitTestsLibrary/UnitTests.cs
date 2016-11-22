using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace UnitTestsLibrary
{
    public class UnitTests
    {
        [Fact]
        public void test1()
        {
            Assert.True(true);
        }

        [Fact]
        public void test2()
        {
            Assert.True(false);
        }
    }
}
