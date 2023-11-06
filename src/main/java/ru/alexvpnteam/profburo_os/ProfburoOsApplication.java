package ru.alexvpnteam.profburo_os;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;
import ru.alexvpnteam.profburo_os.service.BotService;

@SpringBootApplication
public class ProfburoOsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProfburoOsApplication.class, args);
	}

}
