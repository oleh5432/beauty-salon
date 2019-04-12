package kurakh.beautysalon.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HtmlPageController {

    @RequestMapping("/")
    public String mainPage(){
        return "main.html";
    }

    @RequestMapping("/admin")
    public String adminPage(){
        return "adminPage.html";
    }

    @RequestMapping("/create-product")
    public String productPage(){
        return "adminProductPage.html";
    }

    @RequestMapping("/create-category")
    public String categoryPage(){
        return "adminCategoryPage.html";
    }
}
