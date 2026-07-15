# Authorization

Přístupová práva:
- Běžný uživatel smí přistupovat (číst/zapisovat) POUZE ke svým vlastním datům (účty, transakce), kde `user_id` odpovídá JWT tokenu.
- API vrstva kontroluje vlastnictví entity při každém požadavku.
