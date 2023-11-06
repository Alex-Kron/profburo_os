package ru.alexvpnteam.profburo_os.service;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.AnswerCallbackQuery;
import org.telegram.telegrambots.meta.api.methods.send.SendGame;
import org.telegram.telegrambots.meta.api.objects.CallbackQuery;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.commands.BotCommand;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import ru.alexvpnteam.profburo_os.config.BotConfig;

import java.util.ArrayList;
import java.util.List;
@Slf4j
@Service
public class BotService extends TelegramLongPollingBot {

    final BotConfig config;

    public BotService(BotConfig newConfig) {
        super(newConfig.getBotToken());
        config = newConfig;
        List<BotCommand> commandList = new ArrayList<>();
    }

    @Override
    public String getBotUsername() {
        return config.getBotName();
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasCallbackQuery()) {
            CallbackQuery callbackQuery = update.getCallbackQuery();

            AnswerCallbackQuery answer = new AnswerCallbackQuery();
            answer.setUrl("192.168.20.128:8080/prof4game");
            answer.setCallbackQueryId(callbackQuery.getId());
            answer.setShowAlert(false);
            try {
                execute(answer);
            } catch (TelegramApiException exception) {
                log.error(exception.getMessage());
            }
        }

        if (update.hasMessage() && update.getMessage().hasText()) {
            String message = update.getMessage().getText();
            Long chatId = update.getMessage().getChatId();


            switch (message) {
                case "/start":
                    SendGame game = new SendGame();
                    game.setChatId(chatId);
                    game.setGameShortName("prof4game");
                    try {
                        execute(game);
                    } catch(TelegramApiException exception) {
                        log.error(exception.getMessage());
                    }
                    break;
                default: log.info("Unhandled request: " + message);
            }
        }

    }
}
