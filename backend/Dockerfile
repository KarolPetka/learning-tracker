FROM openjdk:17

WORKDIR /app

COPY build/libs/backend-0.0.1-SNAPSHOT.jar /app/application.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "application.jar"]