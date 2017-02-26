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
    public class wordsController : ApiController
    {
        private greEntities db = new greEntities();

        // GET: api/words
        public IQueryable<word> Getwords()
        {
            return db.words;
        }

        // GET: api/words/5
        [ResponseType(typeof(word))]
        public async Task<IHttpActionResult> Getword(long id)
        {
            word word = await db.words.FindAsync(id);
            if (word == null)
            {
                return NotFound();
            }

            return Ok(word);
        }

        // PUT: api/words/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> Putword(long id, word word)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != word.id)
            {
                return BadRequest();
            }

            db.Entry(word).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!wordExists(id))
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

        // POST: api/words
        [ResponseType(typeof(word))]
        public async Task<IHttpActionResult> Postword(word word)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.words.Add(word);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = word.id }, word);
        }

        // DELETE: api/words/5
        [ResponseType(typeof(word))]
        public async Task<IHttpActionResult> Deleteword(long id)
        {
            word word = await db.words.FindAsync(id);
            if (word == null)
            {
                return NotFound();
            }

            db.words.Remove(word);
            await db.SaveChangesAsync();

            return Ok(word);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool wordExists(long id)
        {
            return db.words.Count(e => e.id == id) > 0;
        }
    }
}