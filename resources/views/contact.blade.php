<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc; }
        .header { background: #071b38; color: #fff; padding: 15px; text-align: center; border-radius: 6px 6px 0 0; font-weight: bold; }
        .content { padding: 20px; background: #fff; border-radius: 0 0 6px 6px; }
        .label { font-weight: bold; color: #071b38; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Pesan Baru dari Website Servistama Pro Indonesia</div>
        <div class="content">
            <p>Anda menerima pesan baru dari halaman Contact Us:</p>
            <p class="label">Nama Pengirim:</p>
            <p>{{ $msgData['name'] }}</p>

            <p class="label">Email Pengirim:</p>
            <p>{{ $msgData['email'] }}</p>

            <p class="label">Nomor Telepon / WhatsApp:</p>
            <p>{{ $msgData['phone'] }}</p>

            <p class="label">Subjek:</p>
            <p>{{ $msgData['subject'] }}</p>

            <p class="label">Pesan:</p>
            <p style="background: #f1f5f9; padding: 12px; border-radius: 6px;">{{ $msgData['message'] }}</p>
        </div>
    </div>
</body>
</html>