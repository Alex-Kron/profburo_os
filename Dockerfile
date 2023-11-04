FROM amazoncorretto:17

ENV SPRING_PROFILES_ACTIVE=production
ENV SPRING_APPLICATION_JSON={}

WORKDIR /app

COPY target/profburo_os-0.0.1-SNAPSHOT.jar /app/profburo_os.jar

EXPOSE 8080
