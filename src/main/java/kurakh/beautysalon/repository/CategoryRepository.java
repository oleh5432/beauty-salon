package kurakh.beautysalon.repository;

import kurakh.beautysalon.entity.Category;
import kurakh.beautysalon.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByName(String name);

    Page<Category> findAllByNameLike(Pageable pageable, String name);
}
