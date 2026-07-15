# FROM eclipse-temurin:21-jdk

# WORKDIR /app

# COPY . .

# RUN chmod +x mvnw
# RUN ./mvnw clean package -DskipTests

# EXPOSE 8080

# CMD ["sh","-c","java -jar target/*.jar"]


# Stage 1: Build
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
# CMD ["sh","-c","java -jar target/*.jar"]