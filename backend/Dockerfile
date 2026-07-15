FROM eclipse-temurin:21-jdk

WORKDIR /

ADD target/sms-0.0.1-SNAPSHOT.war app.war

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app.war"]