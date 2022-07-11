package rw.ac.rca.ne.cedric.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rw.ac.rca.ne.cedric.server.models.Link;

@Repository
public interface ILinkRepository extends JpaRepository<Link, Long> {

}
