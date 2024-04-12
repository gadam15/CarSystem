using CarSystemWebAPI.Models.DTO;
using CarSystemWebAPI.Models;

namespace CarSystemWebAPI.Repositories
{
    //Interface repozytorium generycznego
    public interface IEntityBaseRepository<T> where T : class
    {
        public IEnumerable<T> GetAll();
        public T GetById(int id);
        public void Create(T t);
        public void Update(int id, T t);
        public void Delete(int id);
    }
}
