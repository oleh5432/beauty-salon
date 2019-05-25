package kurakh.beautysalon.entity;

        import com.fasterxml.jackson.annotation.JsonFormat;
        import lombok.*;

        import javax.persistence.*;
        import java.time.LocalDateTime;
        import java.util.ArrayList;
        import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @OneToMany(mappedBy = "section")
    private List<Category> categories = new ArrayList<>();

    private String pathToImg;
}

