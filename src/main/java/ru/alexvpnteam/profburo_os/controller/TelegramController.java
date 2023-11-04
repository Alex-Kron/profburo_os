package ru.alexvpnteam.profburo_os.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class TelegramController {

    @GetMapping("/")
    public String start() {
        return "start";
    }
}
