package com.company.employee_manager.controller;

import com.company.employee_manager.model.Employee;
import com.company.employee_manager.repository.EmployeeRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class EmployeeControllerTest {

    EmployeeRepository employeeRepository = mock(EmployeeRepository.class);
    EmployeeController employeeController = new EmployeeController(employeeRepository);


    @Test
    void findAllEmployee() {
        employeeController.findAllEmployee();
        verify(employeeRepository).findAll();
    }

    @Test
    void saveEmployee() {
        var employee = new Employee("Tom", "Bond", "mail", LocalDate.of(2000, 1, 1));
        when(employeeController.saveEmployee(employee)).thenReturn(
                new Employee("Tom", "Bond", "mail", LocalDate.of(2000, 1, 1)));

        var result = employeeController.saveEmployee(employee);

        assertEquals(result.getFirstName(), employee.getFirstName());
        assertEquals(result.getLastName(), employee.getLastName());
        assertEquals(result.getMail(), employee.getMail());
        assertEquals(result.getEntryDate(), employee.getEntryDate());
        verify(employeeRepository).save(employee);
    }

    @Test
    void deleteEmployee() {

    }

}