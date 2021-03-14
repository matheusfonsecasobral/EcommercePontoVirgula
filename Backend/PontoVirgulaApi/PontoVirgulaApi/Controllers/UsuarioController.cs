using APIPontoVirgula.Data;
using APIPontoVirgula.Data.Repository.ModelEntity;
using Microsoft.AspNetCore.Cors;
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
        public async Task<ActionResult> GetValidation([FromServices] DataContext context, UsuarioModelView usuarioModel)
        {
            var usuario = await context.Usuario
                                .AsNoTracking()
                                .FirstOrDefaultAsync(x => x.EMAIL == usuarioModel.Email);

            if(usuario == null)
            {
                return Ok(0);
            }
            else
            {
                if(usuario.SENHA == usuarioModel.Senha)
                {
                    return Ok(1);
                }
                else
                {
                    return Ok(0);
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
