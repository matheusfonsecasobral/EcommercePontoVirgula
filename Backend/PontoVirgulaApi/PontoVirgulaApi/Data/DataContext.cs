using APIPontoVirgula.Data.Repository.ModelEntity;
using Microsoft.EntityFrameworkCore;

namespace APIPontoVirgula.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuario { get; set; }
    }
}
