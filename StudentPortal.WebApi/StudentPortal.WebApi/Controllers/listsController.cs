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
using System.Web.Http.Cors;

namespace StudentPortal.WebApi.Controllers
{
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    [EnableCors(origins: "http://ui01.azurewebsites.net", headers: "*", methods: "*")]
    public class listsController : ApiController
    {
        private greEntities db = new greEntities();

        // GET: api/lists
        public IQueryable<list> Getlists()
        {
            return db.lists;
        }

        // GET: api/lists/5
        [ResponseType(typeof(list))]
        public async Task<IHttpActionResult> Getlist(long id)
        {
            list list = await db.lists.FindAsync(id);
            if (list == null)
            {
                return NotFound();
            }

            return Ok(list);
        }

        // PUT: api/lists/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> Putlist(long id, list list)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != list.id)
            {
                return BadRequest();
            }

            db.Entry(list).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!listExists(id))
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

        // POST: api/lists
        [ResponseType(typeof(list))]
        public async Task<IHttpActionResult> Postlist(list list)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.lists.Add(list);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = list.id }, list);
        }

        // DELETE: api/lists/5
        [ResponseType(typeof(list))]
        public async Task<IHttpActionResult> Deletelist(long id)
        {
            list list = await db.lists.FindAsync(id);
            if (list == null)
            {
                return NotFound();
            }

            db.lists.Remove(list);
            await db.SaveChangesAsync();

            return Ok(list);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool listExists(long id)
        {
            return db.lists.Count(e => e.id == id) > 0;
        }
    }
}