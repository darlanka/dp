package dev.praneeth.portfolio;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest(properties = "portfolio.contact.file=target/test-messages.jsonl")
@AutoConfigureMockMvc
class PortfolioApplicationTests {

    @Autowired
    private MockMvc mvc;

    // @Test
    // void profileIsServed() throws Exception {
    // mvc.perform(get("/api/profile"))
    // .andExpect(status().isOk())
    // .andExpect(jsonPath("$.name").value("Darlanka Praneeth"));
    // }

    // @Test
    // void validMessageIsAccepted() throws Exception {
    // mvc.perform(post("/api/contact")
    // .contentType(MediaType.APPLICATION_JSON)
    // .content("""
    // {"name":"Asha","email":"asha@example.com",
    // "message":"Hi, I saw your portfolio and would like to
    // talk.","website":""}"""))
    // .andExpect(status().isAccepted());
    // }

    // @Test
    // void invalidMessageIsRejected() throws Exception {
    // mvc.perform(post("/api/contact")
    // .contentType(MediaType.APPLICATION_JSON)
    // .content("{\"name\":\"\",\"email\":\"nope\",\"message\":\"short\"}"))
    // .andExpect(status().isBadRequest());
    // }
}
