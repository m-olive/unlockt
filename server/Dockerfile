FROM maven:3.9.6-amazoncorretto-21 AS builder
WORKDIR /app
COPY . .

RUN mvn clean package -DskipTests

FROM amazoncorretto:21-alpine-jdk AS runtime
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]