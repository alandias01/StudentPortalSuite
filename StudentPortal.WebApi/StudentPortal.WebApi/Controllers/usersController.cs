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
    public class usersController : ApiController
    {
        private greEntities db = new greEntities();

        // GET: api/users
        public IQueryable<user> Getusers()
        {
            return db.users;
        }

        // GET: api/users/5
        [ResponseType(typeof(user))]
        public async Task<IHttpActionResult> Getuser(string id)
        {
            user user = await db.users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/users/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> Putuser(string id, user user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.email)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!userExists(id))
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

        // POST: api/users
        [ResponseType(typeof(user))]
        public async Task<IHttpActionResult> Postuser(user user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.users.Add(user);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (userExists(user.email))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = user.email }, user);
        }

        // DELETE: api/users/5
        [ResponseType(typeof(user))]
        public async Task<IHttpActionResult> Deleteuser(string id)
        {
            user user = await db.users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            db.users.Remove(user);
            await db.SaveChangesAsync();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool userExists(string id)
        {
            return db.users.Count(e => e.email == id) > 0;
        }
    }
}