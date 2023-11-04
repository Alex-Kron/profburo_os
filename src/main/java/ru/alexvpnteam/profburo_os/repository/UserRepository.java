package ru.alexvpnteam.profburo_os.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.alexvpnteam.profburo_os.entity.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {}
