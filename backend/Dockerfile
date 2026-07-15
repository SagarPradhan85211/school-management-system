# FROM eclipse-temurin:21-jdk

# WORKDIR /app

# COPY . .

# RUN chmod +x mvnw
# RUN ./mvnw clean package -DskipTests

# EXPOSE 8080

# CMD ["sh","-c","java -jar target/*.jar"]


# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY . .
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]