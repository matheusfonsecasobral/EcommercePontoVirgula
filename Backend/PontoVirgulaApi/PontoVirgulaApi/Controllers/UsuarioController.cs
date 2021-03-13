using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIPontoVirgula.Data;
using APIPontoVirgula.Data.Repository.ModelEntity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIPontoVirgula.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        [HttpGet("Validation")]
        public async Task<ActionResult> GetValidation([FromServices] DataContext context, string email, string senha)
        {
            var usuario = await context.Usuario
                                .AsNoTracking()
                                .FirstOrDefaultAsync(x => x.EMAIL == email);

            if(usuario == null)
            {
                return BadRequest(ModelState);
            }
            else
            {
                if(usuario.SENHA == senha)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(ModelState);
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

        [HttpPost]
        public async Task<ActionResult<Usuario>> Post([FromServices] DataContext context, [FromBody] Usuario usuario)
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
