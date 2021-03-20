using APIPontoVirgula.Data;
using APIPontoVirgula.Data.Repository.ModelEntity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PontoVirgulaApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace APIPontoVirgula.Controllers
{
    [Route("api/[controller]")]

    [ApiController]

    public class UsuarioController : ControllerBase
    {
        [HttpPost("Validation")]
        public async Task<ActionResult<bool>> GetValidation([FromServices] DataContext context, [FromBody] UsuarioModelView usuarioModel)
        {
            var usuario = await context.Usuario
                                .AsNoTracking()
                                .FirstOrDefaultAsync(x => x.EMAIL == usuarioModel.Email);

            if (usuario == null)
            {
                return false;
            }
            else
            {
                if (usuario.SENHA == usuarioModel.Senha)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> GetList([FromServices] DataContext context)
        {
            var usuarios = await context.Usuario
                                .AsNoTracking()
                                .ToListAsync();

            return usuarios;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetList([FromServices] DataContext context, int id)
        {
            var usuarios = await context.Usuario
                                    .AsNoTracking()
                                    .FirstOrDefaultAsync(x => x.ID == id);

            return usuarios;
        }

        [HttpPost]
        public async Task<ActionResult<Usuario>> Post([FromServices] DataContext context, Usuario usuario)
        {
            if (ModelState.IsValid)
            {
                context.Usuario.Add(usuario);
                await context.SaveChangesAsync();
                return usuario;
            }
            else
            {
                return BadRequest(ModelState);

            }
        }
    }
}
