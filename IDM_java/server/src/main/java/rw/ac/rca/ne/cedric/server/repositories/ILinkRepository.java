package rw.ac.rca.ne.cedric.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rw.ac.rca.ne.cedric.server.models.Link;
import rw.ac.rca.ne.cedric.server.models.Website;

import java.util.List;
import java.util.UUID;

@Repository
public interface ILinkRepository extends JpaRepository<Link, UUID> {
    List<Link> findByWebsite(Website website);
}
