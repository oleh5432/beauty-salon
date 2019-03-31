package kurakh.beautysalon.service;

import kurakh.beautysalon.dto.request.OrderRequest;
import kurakh.beautysalon.dto.request.ProductRequest;
import kurakh.beautysalon.dto.response.OrderResponse;
import kurakh.beautysalon.dto.response.ProductResponse;
import kurakh.beautysalon.entity.Order;
import kurakh.beautysalon.entity.Product;
import kurakh.beautysalon.exception.WrongInputDataException;
import kurakh.beautysalon.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    public OrderResponse save(OrderRequest orderRequest) throws WrongInputDataException {
        return new OrderResponse(orderRepository.save(orderRequestToOrder(orderRequest, null)));
    }

    public OrderResponse update(Long id, OrderRequest orderRequest) throws WrongInputDataException {
        return new OrderResponse(orderRepository
                .save(orderRequestToOrder(orderRequest, findOneById(id))));
    }

    private Order orderRequestToOrder(OrderRequest orderRequest, Order order) throws WrongInputDataException {
        if (order == null) {
            order = new Order();
        }
        order.setProducts(productService.findProductsById(orderRequest.getProductId()));
        order.setUser(userService.findOneById(orderRequest.getUserId()));
        return order;
    }

    public Order findOneById(Long id) throws WrongInputDataException {
        return orderRepository.findById(id)
                .orElseThrow(() -> new WrongInputDataException("Product with id '" + id + "' not exists"));

    }
}
