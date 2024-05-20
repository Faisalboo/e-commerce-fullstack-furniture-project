using AutoMapper;
using sda_onsite_2_csharp_backend_teamwork.src.DTOs;
using sda_onsite_2_csharp_backend_teamwork.src.Entities;
using sda_onsite_2_csharp_backend_teamwork.src.Repositories;
using sda_onsite_2_csharp_backend_teamwork.src.Services;

namespace sda_onsite_2_csharp_backend_teamwork.src.Controller
{

    public class CategoryService : ICategoryService

    {

        private ICategoryRepository _categoryRepository;
        private IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public Category CreateOne(CategoryCreateDto category)
        {

            Category? mappedCategory = _mapper.Map<Category>(category);
            Category newCategory = _categoryRepository.CreateOne(mappedCategory);
            return newCategory;
        }

        public IEnumerable<Category> FindAll()
        {
            return _categoryRepository.FindAll();
        }

        public Category? FindOne(Guid categoryId)
        {
            return _categoryRepository.FindOne(categoryId);
        }
        public Category? DeleteOne(Guid categoryId)
        {
            var categoryFound = _categoryRepository.FindOne(categoryId);
            if (categoryFound != null)
            {
                return _categoryRepository.DeleteOne(categoryId);
            }

            return null;
        }

        public Category? UpdateOne(Guid categoryId, Category category)
        {

            var item = _categoryRepository.FindOne(categoryId);
            if (item != null)
            {
                item.Name = category.Name;
                return _categoryRepository.UpdateOne(item);
            }
            else
            {
                return null;
            }
        }




    }
}