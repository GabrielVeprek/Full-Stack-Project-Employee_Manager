package com.company.employee_manager.repository;

import com.company.employee_manager.model.employee.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

    @Query(value = "select *\n" +
            "from employee e \n" +
            "order by entry_date desc \n" +
            "limit 1", nativeQuery = true)
    Employee getJunior();

    @Query(value = "select *\n" +
            "from employee e \n" +
            "order by entry_date asc \n" +
            "limit 1", nativeQuery = true)
    Employee getSenior();

    @Query(value = "\n" +
            "select AVG(extract (year from current_date)  - extract (year from entry_date)) as avergae_time \n" +
            "from employee e  ", nativeQuery = true)
    Object getAverageTenure();

    @Query(value = "SELECT * FROM employee e " +
            "WHERE e.last_name ILIKE :input || '%' OR e.first_name ILIKE :input || '%'", nativeQuery = true)
    List<Employee> searchByInput(@Param("input") String input);
}
