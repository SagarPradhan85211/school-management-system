FROM eclipse-temurin:21-jdk


ADD target/sms-0.0.1-SNAPSHOT.war app.war

ENTRYPOINT [ "java" ,"-jar" , "/app.war" ]


EXPOSE 8080
