<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Report</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,400;1,100&display=swap"
          rel="stylesheet">
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }

        .report-container {
            display: flex;
            flex-direction: column;
            margin-top: 50px;

        }

        .report-container h2 {
            text-align: center;
            margin-top: 10px;
        }

        .report-container-sub {
            width: 100%;
            height: auto;
        }

        .report-container-sub table {
            width: 95%;
            height: auto;
            margin-left: 30px;
            margin-top: 10px;

        }

        .table-header {
            height: 2.8rem;
            background: #EEF2FF;
        }

        .table-body tr td {
            text-align: center;
            padding-top: 12px;
        }
        a{
            color: black;
            text-decoration: underline;
        }
    </style>
</head>
<body>
<jsp:include page="components/Navbar.jsp"></jsp:include>
<div class="report-container">
    <h2>Report</h2>
    <div class="report-container-sub">
        <table>
            <thead class="table-header">
            <th>Link Name</th>
            <th>Website Name</th>
            <th>Total elapsed time(MS)</th>
            <th>Kilobytes Downloaded</th>

            </thead>
            <tbody class="table-body">
            <c:forEach items="${links}" var="url">
                <tr>
                    <td>${url.link_name}</td>
                    <td>${url.website.website_name}</td>
                    <td>${url.total_elapsed_time}</td>
                    <td>${url.total_downloaded_kilobytes}</td>
                </tr>
            </c:forEach>

            </tbody>
        </table>
    </div>

</div>

</body>
</html>