using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using StudentPortal.Data.GRE;

namespace StudentPortal.WebApi.Controllers
{
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    //[EnableCors(origins: "http://ui01.azurewebsites.net", headers: "*", methods: "*")]
    public class vlistwordsController : ApiController
    {
        private greEntities db = new greEntities();

        // GET: api/vlistwords
        public IQueryable<vlistword> Getvlistwords()
        {
            return db.vlistwords;
        }

        // GET: api/vlistwords/5
        [ResponseType(typeof(vlistword))]
        public async Task<IHttpActionResult> Getvlistword(string id)
        {
            vlistword vlistword = await db.vlistwords.FindAsync(id);
            if (vlistword == null)
            {
                return NotFound();
            }

            return Ok(vlistword);
        }

        // PUT: api/vlistwords/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> Putvlistword(string id, vlistword vlistword)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vlistword.email)
            {
                return BadRequest();
            }

            db.Entry(vlistword).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!vlistwordExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/vlistwords
        [ResponseType(typeof(vlistword))]
        public async Task<IHttpActionResult> Postvlistword(vlistword vlistword)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.vlistwords.Add(vlistword);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (vlistwordExists(vlistword.email))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = vlistword.email }, vlistword);
        }

        // DELETE: api/vlistwords/5
        [ResponseType(typeof(vlistword))]
        public async Task<IHttpActionResult> Deletevlistword(string id)
        {
            vlistword vlistword = await db.vlistwords.FindAsync(id);
            if (vlistword == null)
            {
                return NotFound();
            }

            db.vlistwords.Remove(vlistword);
            await db.SaveChangesAsync();

            return Ok(vlistword);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool vlistwordExists(string id)
        {
            return db.vlistwords.Count(e => e.email == id) > 0;
        }
    }
}