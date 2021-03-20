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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Password=Ra9711;Persist Security Info=True;User ID=raquel;Initial Catalog=DbPontoVirgula;Data Source=DESKTOP-GQFVHF3");
            //optionsBuilder.UseSqlServer("Password=sa123;Persist Security Info=True;User ID=thiago;Initial Catalog=DbPontoVirgula;Data Source=DESKTOP-UNJT0R6");
            //optionsBuilder.UseSqlServer("Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=DbPontoVirgula;Data Source=DESKTOP-23VP51C");
        }
    }
}
